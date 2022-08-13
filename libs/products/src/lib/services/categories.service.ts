import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CategoryInterface} from "../models/category";
import {environment} from "@env/environment";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = `${environment.apiUrl}/categories`;
  }

  getCategories(): Observable<CategoryInterface[]> {
    return this.http.get<CategoryInterface[]>(this.apiUrl);
  }

  getCategory(id: string): Observable<CategoryInterface> {
    return this.http.get<CategoryInterface>(`${this.apiUrl}/${id}`);
  }

  addCategory(payload: CategoryInterface): Observable<CategoryInterface> {
    return this.http.post<CategoryInterface>(this.apiUrl, payload);
  }

  deleteCategory(id: string): Observable<CategoryInterface> {
    return this.http.delete<CategoryInterface>(`${this.apiUrl}/${id}`);
  }

  editCategory(id: string, payload: CategoryInterface): Observable<CategoryInterface> {
    return this.http.put<CategoryInterface>(`${this.apiUrl}/${id}`, payload);
  }
}
