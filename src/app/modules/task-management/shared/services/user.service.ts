import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl;
  userForEdit: any = null;

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService
  ) {}

  addNewUser(user: User) {
    return this.http.post(this.apiUrl + '/api/User', {
      firstName: user.firstName,
      lastName: user.lastName,
    });
  }

  getAllDropDownUsers(): Observable<any> {
    return this.http.get(this.apiUrl + '/api/User');
  }

  getAllUsers(): Observable<any>{
    this.loadingService.IsLoadingSubject.next(true);
    return this.http.get(this.apiUrl + '/api/User');
  }
  editUser(user: any, userId: number): Observable<any> {
    return this.http.put(
      this.apiUrl + '/api/User/' + userId,
      user
    );
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(
      this.apiUrl + '/api/User/' + userId
    );
  }
}
