import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {environment} from "@env/environment";
import {ProductInterface} from "../models/product";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = `${environment.apiUrl}/products`;
  }

  getProducts(selectedCategories?: string[]): Observable<ProductInterface[]> {
    let params = new HttpParams();

    if (selectedCategories) {
      params = params.append('categories', selectedCategories.join(','));
    }

    return this.http.get<ProductInterface[]>(this.apiUrl, {params});
  }

  createProduct(productData: FormData): Observable<ProductInterface> {
    return this.http.post<ProductInterface>(this.apiUrl, productData);

  }

  getProduct(id: string): Observable<ProductInterface> {
    return this.http.get<ProductInterface>(`${this.apiUrl}/${id}`);
  }

  deleteProduct(id: string): Observable<ProductInterface> {
    return this.http.delete<ProductInterface>(`${this.apiUrl}/${id}`);
  }

  editProduct(id: string, payload: FormData): Observable<ProductInterface> {
    return this.http.put<ProductInterface>(`${this.apiUrl}/${id}`, payload);
  }

  getProductsCount() {
    return this.http.get<{count: number}>(`${this.apiUrl}/get/count`)
      .pipe(
        map(({count}) => count)
      )
  }

  getFeaturedProducts(count: number): Observable<ProductInterface[]> {
    return this.http.get<ProductInterface[]>(`${this.apiUrl}/get/featured/${count}`)
  }
}
