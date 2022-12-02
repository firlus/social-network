import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { PrismaClient } from '@prisma/client';
import { token } from 'schema';
import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest,
): Promise<void> {
  const prisma = new PrismaClient();
  // Access Control: Anonymous

  // Schema Validation: Expect UserCreateData
  const parsingResult = token.tokenDataParser.safeParse(req.body);
  if (parsingResult.success === false) {
    context.log(parsingResult.error);
    context.res = {
      status: 400,
      body: {
        error: parsingResult.error,
      },
    };
    return;
  }
  const tokenData: token.TokenData = parsingResult.data;

  // Check database for users
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        {
          email: tokenData.userIdentificator,
        },
        {
          username: tokenData.userIdentificator,
        },
      ],
    },
  });

  if (user) {
    // Validate password
    if (await bcrypt.compareSync(tokenData.password, user.hashedPassword)) {
      const jwt = sign(user.id.toString(), '123');
      context.res = {
        status: 200,
        body: {
          jwt,
        },
      };
      return;
    } else {
      context.res = {
        status: 401,
        body: {
          error: 'Invalid user credentials.',
        },
      };
      return;
    }
  } else {
    context.res = {
      status: 401,
      body: {
        error: 'Invalid user credentials.',
      },
    };
    return;
  }
};

export default httpTrigger;
