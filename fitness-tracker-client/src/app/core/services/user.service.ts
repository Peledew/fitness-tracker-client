import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './abstract/base.service';
import { UserDto } from '../models/userDto';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService<UserDto> {
  constructor(http: HttpClient) {
    super(http, 'users');
  }
}
