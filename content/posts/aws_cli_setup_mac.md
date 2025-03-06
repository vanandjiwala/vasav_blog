---
author: ["Vasav Anandjiwala"]
title: "AWS Cli Setup on Macbook with M1 chipset"
date: "2023-03-10"
description: "AWS Cli Setup on macbook with ARM chipset."
summary: "AWS Cli Setup on macbook with ARM chipset."
tags: ["aws"]
categories: ["aws"]
series: ["aws"]
cover:
  image: images/aws_cli.svg
ShowToc: true
TocOpen: true
social:
  fediverse_creator: "@vanandjiwala@mastodon.social"
---

## Setting up AWS CLI on Mac book with M1 chipset

1. For reference visit the [official aws cli setup documentation webpage](https://docs.aws.amazon.com/cli/v1/userguide/install-macos.html).
2. navigate to `https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html` to obtain the latest package
3. Download the `.pkg` file
4. Double click on the downloaded file. A UI installer will open and then follow the requied steps.
5. After the complition, go to terminal and enter the command `aws`. This should return the following:

```
usage: aws [options] <command> <subcommand> [<subcommand> ...] [parameters]
To see help text, you can run:

  aws help
  aws <command> help
  aws <command> <subcommand> help

aws: error: the following arguments are required: command
```

This suggests successful installation of AWS CLI.

6. Check the version using command `aws --version`.

```
aws-cli/2.5.8 Python/3.9.11 Darwin/21.3.0 exe/x86_64 prompt/off
```

7. Configure the aws cli using command `aws configure`. More details can be found here - `https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html`
8. Enter the credentials and then you are all set to use `aws cli`.
