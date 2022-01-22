import { Template } from "aws-cdk-lib/assertions";
import * as sst from "@serverless-stack/resources";
import ApiStack from "../../stacks/apiStack";

test("Test if API stack exists", () => {
  const app = new sst.App();

  const apiStack = new ApiStack(app, "api", {})
  const template = Template.fromStack(apiStack)
  template.hasResourceProperties("AWS::Lambda::Function", {
  });
});
