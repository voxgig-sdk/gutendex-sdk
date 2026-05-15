package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewBookEntityFunc func(client *GutendexSDK, entopts map[string]any) GutendexEntity

