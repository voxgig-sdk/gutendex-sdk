import { GutendexEntityBase } from '../GutendexEntityBase';
import type { GutendexSDK } from '../GutendexSDK';
import type { Control } from '../types';
import type { Book, BookLoadMatch, BookListMatch } from '../GutendexTypes';
declare class BookEntity extends GutendexEntityBase<Book> {
    constructor(client: GutendexSDK, entopts: any);
    make(this: BookEntity): BookEntity;
    load(this: any, reqmatch?: BookLoadMatch, ctrl?: Control): Promise<BookEntity>;
    list(this: any, reqmatch?: BookListMatch, ctrl?: Control): Promise<BookEntity[]>;
}
export { BookEntity };
