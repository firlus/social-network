import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { PrismaClient } from '@prisma/client';
import { user } from 'schema';
import * as bcrypt from 'bcrypt';

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest,
): Promise<void> {
  const prisma: PrismaClient = new PrismaClient();

  // Access Control: Anonymous

  // Schema Validation: Expect UserCreateData
  const parsingResult = user.userCreateDataParser.safeParse(req.body);
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
  const userCreateData: user.UserCreateData = parsingResult.data;

  // Further assertions
  // 1. Check if e-mail is already in use
  const userWithSameEmail = await prisma.user.findFirst({
    where: { email: userCreateData.email },
  });
  context.log(userWithSameEmail);
  if (userWithSameEmail) {
    context.res = {
      status: 400,
      body: {
        error: 'E-Mail is already in use.',
      },
    };
    return;
  }

  // Hash password
  const hashedPassword = bcrypt.hashSync(userCreateData.password, 10);

  // Create user in database
  await prisma.user.create({
    data: {
      username: userCreateData.username,
      email: userCreateData.email,
      hashedPassword,
      displayName: userCreateData.displayName,
    },
  });
};

export default httpTrigger;
