import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../common/book';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseUrl = "http://localhost:9090/api/v1/books";

  constructor(private httpClient: HttpClient) { }

  getBooks(theCategoryId: number): Observable<Book[]>{
    const searchUrl = `${this.baseUrl}/search/categoryId?id=${theCategoryId}`;
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
