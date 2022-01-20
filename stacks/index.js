import ApiStack from "./apiStack"

export default function main(app) {
  const apiStack = new ApiStack(app, "api", {})
}