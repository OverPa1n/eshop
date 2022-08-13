import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable, switchMap} from "rxjs";
import {environment} from "@env/environment";
import {StripeService} from "ngx-stripe";
import {OrderInterface} from "../models/order";
import {OrderItemInterface} from "../models/order-item";
import {ProductInterface} from "@bluebits/products";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  apiUrl: string;
  productsApiUrl: string;

  constructor(private http: HttpClient, private stripe: StripeService) {
    this.apiUrl = `${environment.apiUrl}/orders`;
    this.productsApiUrl = `${environment.apiUrl}/products`;

  }

  getOrders(): Observable<OrderInterface[]> {
    return this.http.get<OrderInterface[]>(this.apiUrl);
  }

  getOrder(id: string): Observable<OrderInterface> {
    return this.http.get<OrderInterface>(`${this.apiUrl}/${id}`);
  }

  addOrder(payload: OrderInterface): Observable<OrderInterface> {
    return this.http.post<OrderInterface>(this.apiUrl, payload);
  }

  deleteOrder(id: string): Observable<OrderInterface> {
    return this.http.delete<OrderInterface>(`${this.apiUrl}/${id}`);
  }

  editOrder(id: string, orderStatus: string): Observable<OrderInterface> {
    return this.http.put<OrderInterface>(`${this.apiUrl}/${id}`, {status: orderStatus});
  }
  getOrderCount() {
    return this.http.get<{count: number}>(`${this.apiUrl}/get/count`)
      .pipe(
        map(({count}) => count)
      )
  }

  getTotalSales() {
    return this.http.get<{totalSales: number}>(`${this.apiUrl}/get/totalsales`)
      .pipe(
        map(({totalSales}) => totalSales)
      )
  }

  getProduct(id: string): Observable<ProductInterface> {
    return this.http.get<ProductInterface>(`${this.productsApiUrl}/${id}`);
  }

  createCheckoutSession(orderItems: OrderItemInterface[]) {
    return this.http.post<{id: string}>(`${this.apiUrl}/create-checkout-session`, orderItems)
      .pipe(
        switchMap((sessionData: {id: string}) => {
          return this.stripe.redirectToCheckout({sessionId: sessionData.id});
        })
      )
  }

  cacheOrderData(order: OrderInterface) {
    localStorage.setItem('orderData', JSON.stringify(order));
  }

  getCachedOrderData(): OrderInterface {
    return JSON.parse(localStorage.getItem('orderData') as string);
  }

  removeCachedOrderData() {
    localStorage.removeItem('orderData');
  }
}
