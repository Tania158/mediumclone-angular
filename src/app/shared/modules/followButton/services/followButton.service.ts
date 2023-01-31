import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ProfileInterface } from "src/app/shared/types/profile.interface";
import { GetUserProfileResponseInterface } from "src/app/userProfile/types/getUserProfileResponse.interface";

@Injectable()
export class FollowButtonService {
  constructor(private http: HttpClient) {}

  follow(slug: string): Observable<ProfileInterface> {
    const url = this.getUrl(slug);

    return this.http.post<GetUserProfileResponseInterface>(url, {}).pipe(map(this.getProfile));
  }

  unfollow(slug: string): Observable<ProfileInterface> {
    const url = this.getUrl(slug);

    return this.http.delete<GetUserProfileResponseInterface>(url).pipe(map(this.getProfile))
  }

  getUrl(slug: string): string {
    return `${environment.apiUrl}/profiles/${slug}/follow`;
  }

  getProfile(response: GetUserProfileResponseInterface): ProfileInterface {
    return response.profile;
  }
}