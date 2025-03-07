import { inject, Injectable, signal } from '@angular/core';
import { tap} from 'rxjs';
import { BaseHttpService } from '@shared/data-access/base-http.service';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { CommentsResponse, Comment } from '@shared/interfaces/interfaces';

type CommentsByProductId = Record<number, Comment[]>;

@Injectable({
  providedIn: 'root'
})
export class RatingService extends BaseHttpService {
  private readonly cookie = inject(CookieService);

  ratingPromedio = signal(0);
  hoverRating = signal(0);
  comments = signal<CommentsByProductId>({});

  rateProduct(productoId: number, rating: number, comment: string): void {
    console.log(productoId, rating, comment);
    const params = new HttpParams()
      .set('id', productoId.toString())
      .set('rating', rating.toString())
      .set('comentario', comment)
      .set('action', 'rate');
    
    const token = this.cookie.get('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.post<CommentsResponse>(`${this.apiUrl}productos/rating.php`, null ,{ params, headers }).pipe(
      tap(
        response => {
          if (!response.status) return;

          this.comments.update((current) => ({
            ...current,
            [productoId]: [...(current[productoId] || []), response.comments as Comment],
          }));
        }
      )
    )
    .subscribe();
  }

  getProductComments(productoId: number): void {
    if (!productoId) return;

    this.comments.set([]);

    const params = new HttpParams().set('id', productoId.toString());
    this.http.get<CommentsResponse>(`${this.apiUrl}productos/rating.php`, { params }).pipe(
      tap(
        data => {
          if (!data.status) return;

          this.comments.update((current) => ({
            ...current,
            [productoId]: data.comments as Comment[],
          }));
        }
      )
    )
    .subscribe();
  }

  likeComment(usuarioId: number, commentId: number): void {
    const params = new HttpParams()
      .set('user_id', usuarioId.toString())
      .set('comment_id', commentId.toString())
      .set('action', 'like');

    const token = this.cookie.get('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.post<any>(`${this.apiUrl}productos/rating.php`, null ,{ params, headers }).pipe(
      tap(
        data => {
          if (!data.status) return;

          this.comments.update((current) => {
            const productId = Object.keys(current).find((key) =>
              current[+key].some((comment) => comment.id === commentId)
            );
            if (!productId) return current;

            return {
              ...current,
              [productId]: current[productId as any].map((comment) =>
                comment.id === commentId
                  ? { ...comment, likes: comment.likes! + 1 }
                  : comment
              ),
            };
          });
        }
      )
    )
    .subscribe();
  }

  getCommentsByProductId(productId: number): Comment[] {
    return this.comments()[productId] || [];
  }

  hoverRatingChange(rating: number): void {
    this.hoverRating.set(rating);
  }
}