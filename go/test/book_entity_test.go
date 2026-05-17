package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/gutendex-sdk/go"
	"github.com/voxgig-sdk/gutendex-sdk/go/core"

	vs "github.com/voxgig-sdk/gutendex-sdk/go/utility/struct"
)

func TestBookEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Book(nil)
		if ent == nil {
			t.Fatal("expected non-nil BookEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := bookBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "book." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set GUTENDEX_TEST_BOOK_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		bookRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.book", setup.data)))
		var bookRef01Data map[string]any
		if len(bookRef01DataRaw) > 0 {
			bookRef01Data = core.ToMapAny(bookRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = bookRef01Data

		// LIST
		bookRef01Ent := client.Book(nil)
		bookRef01Match := map[string]any{}

		bookRef01ListResult, err := bookRef01Ent.List(bookRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, bookRef01ListOk := bookRef01ListResult.([]any)
		if !bookRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", bookRef01ListResult)
		}

		// LOAD
		bookRef01MatchDt0 := map[string]any{
			"id": bookRef01Data["id"],
		}
		bookRef01DataDt0Loaded, err := bookRef01Ent.Load(bookRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		bookRef01DataDt0LoadResult := core.ToMapAny(bookRef01DataDt0Loaded)
		if bookRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if bookRef01DataDt0LoadResult["id"] != bookRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func bookBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "book", "BookTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read book test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse book test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"book01", "book02", "book03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("GUTENDEX_TEST_BOOK_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"GUTENDEX_TEST_BOOK_ENTID": idmap,
		"GUTENDEX_TEST_LIVE":      "FALSE",
		"GUTENDEX_TEST_EXPLAIN":   "FALSE",
		"GUTENDEX_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["GUTENDEX_TEST_BOOK_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["GUTENDEX_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["GUTENDEX_APIKEY"],
			},
			extra,
		})
		client = sdk.NewGutendexSDK(core.ToMapAny(mergedOpts))
	}

	live := env["GUTENDEX_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["GUTENDEX_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
