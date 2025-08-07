import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../enviroments/enviroment';

export abstract class BaseService<TDto, TRequest = TDto> {
  protected baseUrl: string;

  constructor(
    protected http: HttpClient,
    private endpoint: string = '',
  ) {
    this.baseUrl = `${environment.apiUrl}/${endpoint}`;
  }

  getAll(): Observable<TDto[]> {
    return this.http.get<TDto[]>(this.baseUrl);
  }

  getById(id: number): Observable<TDto> {
    return this.http.get<TDto>(`${this.baseUrl}/${id}`);
  }

  add(data: TRequest): Observable<TDto> {
    return this.http.post<TDto>(this.baseUrl, data);
  }

  update(id: number, data: TRequest): Observable<TDto> {
    return this.http.put<TDto>(`${this.baseUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  patch(id: number, data: Partial<TRequest>): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${id}`, data);
  }
}
