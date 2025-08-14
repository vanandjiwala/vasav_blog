---
author: ["Vasav Anandjiwala"]
title: "Finding Your Flow: How Vibe Coding Unlocked My Frontend Potential"
date: "2025-08-14"
description: "List of AI-powered helpers I use while coding"
summary: "List of AI-powered helpers I use while coding"
tags: ["Vibe Coding"]
categories: ["Vibe Coding"]
series: ["Vibe Coding"]
cover:
  image: images/aws_cli.svg
ShowToc: true
TocOpen: true
social:
  fediverse_creator: "@vanandjiwala@mastodon.social"
---

## Introduction

As a data engineer who's spent years wrestling with pipelines, ETL processes, and backend systems, frontend development always felt like a foreign language. The constant context switching between design decisions, user experience considerations, and visual feedback loops seemed incompatible with my analytical, systems-thinking approach. But everything changed when I discovered what I call "vibe coding" – a more intuitive, flow-state approach to development that finally made frontend work click for me.
Vibe coding isn't about throwing best practices out the window or coding without structure. Instead, it's about finding that sweet spot where technical execution meets creative exploration, where you can build interfaces while staying in the zone that data engineers know so well. It's coding with momentum, letting the rhythm of iteration and immediate visual feedback guide your decisions rather than getting bogged down in perfectionist planning.

The breakthrough came when I found the right combination of tools and resources that matched my existing mental models. Instead of fighting against my backend-heavy instincts, I learned to channel them into frontend development. Now I can prototype interfaces, build dashboards, and create user-facing applications with the same confidence I bring to designing data architectures.
Here are the key resources and approaches that transformed my relationship with frontend development, turning what once felt like an uphill battle into an engaging creative process.

## Workflow

I rely heavily on the documentation and requirements before jumping into the code. In my experience, breaking down the problem into multiple meaningful pieces will help LLMs to generate code more efficiently. I have taken inspiration from [this blog post](https://harper.blog/2025/02/16/my-llm-codegen-workflow-atm/) which helped me use LLM for generating documentation and plan for my vibe coding project.

I have used cursor, github copilot, codex and claude code for vibe coding especially frontend code which i have very little experience with. I have been using "claude code" since last one month and I have been really enjoying it. As I am gaining more experience prompting and using AI coding, i have started to learn few things along the way. I have been using claude code on minor projects to get my hands dirty but as I gain more confidence coding with these tools, i can attempt to make better, bigger systems which can serve a good enterprise use case.

1. First make high level requirements clear by writing it down in a document. I create a markdown file for it.
2. Once that is done, use any reasoing model or the best possible model to iterate through the requirements. LLM can help you extract more clarity to the first cut document you prepared. Keep iterating over the document until a point where you feel confident in the requirements.
3. Once high level requirements are ready, set the document as a base document.
4. Use "claude init" to setup a claude.md file which is the most important file which contains all project related information and passed along in every request claude code makes. So that context is vital for agents to understand what you are trying to achieve.
5. In claude code, give the document as a reference and then use "plan mode" along with the first set of instruction. (THis depends if you are working through an existing project or creating something from scratch).
6. Keep planning until the plan looks to the points, usually for me it takes at max 3 attepts for claude code to nail it down.
7. Once plan is done, we can start implementation. One important note here while prompting is that, make sure to specify MCP servers that you want to use. In my experience, they have been incredibly useful and have made my workflow efficient. I have listed down MCPs i have used so far.
8. Keep testing as you move forward, generate unit test cases and iterate.

Important to note that, i have ran into hallucinations, weird issues and confusion loops. But for the small project i worked on, I was able to overcome challenges by providing clear instructions, correct MCP tools after few iterations. By far, i am yet to reach full potential but i'll keep updating this post as I learn more on this topic.

## Code Editors

1. vs code
2. cursor

## MCP

1. [Context 7](https://github.com/upstash/context7)
2. [server-sequential-thinking](https://www.npmjs.com/package/@modelcontextprotocol/server-sequential-thinking)
3. [magic UI](https://magicui.design/docs/mcp)
4. [Playwrite MCP](https://github.com/microsoft/playwright-mcp)

## Made By me

1. [Tool to learn and practice SQL](https://sqlowl.app)

## References

1. ["My LLM codegen workflow atm" by Harper Reed](https://harper.blog/2025/02/16/my-llm-codegen-workflow-atm/)
