import User from "../entity/User";
import {
  Arg,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
  Ctx,
  ObjectType,
} from "type-graphql";
import { hash } from "argon2";
import { verify } from "argon2";
import { ReqContext } from "../context/reqContext";

@InputType()
class LoginInput {
  @Field()
  username!: string;

  @Field()
  password!: string;
}
@InputType()
class RegisterInput extends LoginInput {
  @Field()
  name!: string;
}

@ObjectType()
class AuthError {
  @Field()
  field: string;

  @Field()
  msg: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [AuthError], { nullable: true })
  errors?: AuthError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Query(() => String) // A query is must
  helloWorld(): string {
    return "Hello World From GraphQL.";
  }

  @Mutation(() => UserResponse)
  async register(@Arg("data") InputData: RegisterInput): Promise<UserResponse> {
    const { username, password, name } = InputData;
    if (await User.findOne({ username })) {
      return {
        errors: [
          {
            field: "username",
            msg: "Already Exists",
          },
        ],
      };
    }
    if (username.length < 5) {
      return {
        errors: [
          {
            field: "username",
            msg: "Must be greater than 5",
          },
        ],
      };
    } else if (password.length < 5) {
      return {
        errors: [
          {
            field: "password",
            msg: "Must be greater than 5",
          },
        ],
      };
    }
    const user = await User.create({
      username,
      password: await hash(password),
      name,
    }).save();
    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("data") InputData: LoginInput,
    @Ctx() { req }: ReqContext,
  ): Promise<UserResponse> {
    const { username, password } = InputData;

    const user = await User.findOne({ username });
    if (!user) {
      return {
        errors: [
          {
            field: "username",
            msg: "that username doesn't exist",
          },
        ],
      };
    }
    const pw: boolean = await verify(user.password, password);
    if (!pw) {
      return {
        errors: [
          {
            field: "password",
            msg: "Invalid Login",
          },
        ],
      };
    }
    req.session!.userId = user.id;
    return {
      user,
    };
  }

  @Mutation(() => UserResponse, { nullable: true })
  async QueryYourself(
    @Ctx() { req }: ReqContext,
  ): Promise<UserResponse | undefined> {
    const { userId } = req.session!;
    if (!userId) {
      return {
        errors: [
          {
            field: "SESSION",
            msg: "USER MUST BE LOGGED IN",
          },
        ],
      };
    }
    const user = await User.findOne(userId);
    return { user };
  }
}
