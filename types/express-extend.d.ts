import { Session } from "../src/data/entities/Session";
import { User } from "../src/data/entities/User";

declare class ISession extends Session {
  _user?: User;
}

declare global {
  namespace Express {
    interface Request {
      session?: ISession;
      public_key: string;
    }
  }
}
