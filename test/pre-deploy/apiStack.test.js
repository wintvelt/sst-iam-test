import { expect, haveResource } from "@aws-cdk/assert";
import * as sst from "@serverless-stack/resources";
import ApiStack from "../../stacks/apiStack";

test("Test Stack", () => {
  const app = new sst.App();

  const apiStack = new ApiStack(app, "api", {})

  expect(apiStack).to(haveResource("AWS::Lambda::Function"));
});
