import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../common/book';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BookCategory } from '../common/book-category';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseUrl = "http://localhost:9090/api/v1/books";
  private categoryUrl = "http://localhost:9090/api/v1/book-category";

  constructor(private httpClient: HttpClient) { }

  getBooks(theCategoryId: number): Observable<Book[]>{
    const searchUrl = `${this.baseUrl}/search/categoryId?id=${theCategoryId}`;
    return this.getBookList(searchUrl);
  }

  getBookCategories(): Observable<BookCategory[]>{
    return this.httpClient.get<GetResponseBookCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.bookCategory)
    );
  }

  searchBooks(keyword: string): Observable<Book[]>{
    const searchUrl = `${this.baseUrl}/search/searchbykeyword?name=${keyword}`;
    return this.getBookList(searchUrl);
  }

  private getBookList(searchUrl: string): Observable<Book[]> {
    return this.httpClient.get<GetResponseBook>(searchUrl).pipe(
      map(response => response._embedded.books)
    );
  }
}

interface GetResponseBook{
  _embedded: {
    books: Book[];
  }
}

  interface GetResponseBookCategory{
    _embedded: {
      bookCategory: BookCategory[];
    }
}
