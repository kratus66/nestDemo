import { Request } from 'express';
import { User } from 'src/Users/users.entity';

export interface RequestWithUser extends Request {
    user: User;
}