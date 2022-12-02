import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { postCreate } from 'schema';
import { verify } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest,
): Promise<void> {
  const prisma: PrismaClient = new PrismaClient();

  // Schema Validation: Expect UserCreateData
  const parsingResult = postCreate.postCreateDataParser.safeParse(req.body);
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
  const postCreateData: postCreate.UserCreateData = parsingResult.data;

  // Access Control: Valid token
  const jwtData = verify(postCreateData.token, '123');
  if (typeof jwtData === 'string') {
    await prisma.post.create({
      data: {
        text: postCreateData.text,
        authorId: parseInt(jwtData),
      },
    });
  } else {
    context.res = {
      status: 401,
      error: 'Invalid token',
    };
  }
};

export default httpTrigger;
