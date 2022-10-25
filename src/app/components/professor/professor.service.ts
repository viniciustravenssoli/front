import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { Professor } from './professor.model';

import { catchError, map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  baseUrl = "http://localhost:3001/professores"

  constructor(private snackBar: MatSnackBar,
    private http: HttpClient) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-sucess']
    })
  }

  create(professor: Professor): Observable<Professor> {
    return this.http.post<Professor>(this.baseUrl, professor).pipe(
      map(obj => obj),
      catchError(e => this.ErrorHandler(e))
    );
  }

  ErrorHandler(e : any) : Observable<any> {
    this.showMessage('Ocorreu um erro!', true)
    return EMPTY
  }

  read(): Observable<Professor[]> {
    return this.http.get<Professor[]>(this.baseUrl).pipe(
      map(obj => obj),
      catchError(e => this.ErrorHandler(e))
    );
  }

  readById(id: string): Observable<Professor> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Professor>(url).pipe(
      map(obj => obj),
      catchError(e => this.ErrorHandler(e))
    );
  }

  update(professor: Professor): Observable<Professor> {
    const url = `${this.baseUrl}/${professor.id}`
    return this.http.put<Professor>(url, professor).pipe(
      map(obj => obj),
      catchError(e => this.ErrorHandler(e))
    );
  }

  delete(id: number): Observable<Professor> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Professor>(url).pipe(
      map(obj => obj),
      catchError(e => this.ErrorHandler(e))
    );
  }

}
