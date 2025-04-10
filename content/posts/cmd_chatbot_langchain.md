---
author: ["Vasav Anandjiwala"]
title: "Building an AI Chatbot in Python with LangChain and OpenAI"
date: "2025-04-09"
description: "Building a Simple Command-Line Chatbot with LangChain & OpenAI"
summary: "Building a Simple Command-Line Chatbot with LangChain & OpenAI"
tags: ["GenAI"]
categories: ["GenAI"]
series: ["GenAI"]
ShowToc: true
TocOpen: true
social:
fediverse_creator: "@vanandjiwala@mastodon.social"
---

## Introduction

I've been playing around with LangChain and the OpenAI APIs lately, and I decided to build a tiny project to test things out—a command-line chatbot powered by GPT-4o-mini. I named the assistant Agustrama, and it's designed to be a friendly, helpful companion in the terminal.

Full code is available on [this github repo](https://github.com/vanandjiwala/python_notebooks/blob/main/llm/chatbot/chatbot.ipynb).

## What Does This Chatbot Do?

This bot is super simple:

- It greets the user on the first interaction.
- It keeps track of the conversation history.
- It trims the conversation when it gets too long.
- You can exit anytime by typing `q`

All of this is done using LangChain's chat message utilities and OpenAI's model API. Here's a quick walkthrough of how it works.

## Setup

First, we load our environment variables and initialize the model.
Create one `.env` file in the root of the project directory and create a key `OPENAI_API_KEY` with the value associated.
Once `.env` file is ready, we are ready to build our chatbot.

First let us load the environment variable using `dotenv` and create an instance of `ChatOpenAI`.

```
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI

load_dotenv()
model = ChatOpenAI(model="gpt-4o-mini")
```

We also set up an initial system prompt that defines the assistant's persona:

```
messages: Sequence[BaseMessage] = []
system_prompt = SystemMessage(content="Your name is 'Agustrama' and you are a helpful assistant responsible for helping the users in the best possible way. On the first conversation make sure to introduce your self.")
messages.append(system_prompt)
```

Too add some additional context, system messages in chatbots are used to define the personal of the assistant/bot. Here we are naming the bot as `agustrama` - a hypothetical name. `messages` will be holding the chat history so it can be either stored or help us maintain the context of the chat.

## Implementing the chatbot

We are using a simple loop which does the following operations:

- Waits for the user's input.
- Appends it to the message list.
- Sends the messages to the model.
- Prints the model's response.

```
while True:
    chat_messages = messages
    msg = input("User: ")
    if msg == 'q':
        print(f"Agustrama: Thank you very much for contacting me. Hope to see you soon.")
        break;

    if len(messages) >= 7:
        chat_messages = trim_messages(
            messages,
            token_counter=len,
            max_tokens=5,
            start_on="human",
            end_on=("human", "tool"),
            include_system=True,
            allow_partial=False
        )

    user_prompt = HumanMessage(content=msg)
    messages.append(user_prompt)
    chat_messages.append(user_prompt)
    model_response = model.invoke(chat_messages)
    print(f"Agustrama: {model_response.content}")
    messages.append(model_response)
```

Every chat thread is created using system message, human message and AI message. human messages are the prompts user asks while ai message is the response from the LLM. LLMs have a context window so in order to ensure we are not breaching that cutoff context, we have to keep trimming the message. Keeping last X messages will help LLM understand the context of the chat.

As we keep asking questions, we keep appending the question and the response in the `messages` list. In future, I can cover the process of persisting this chat in a database.

## Things covered in this chatbot

- `messages_to_dict` / `messages_from_dict` to serialize/deserialize the conversation
- `trim_messages` to control the size of the history

## Running the experiment

- Setup the virtual environment
- Setup your OPENAI api key
- Execute the notebook and play with the prompts

## Next steps

- Adding memory storage (e.g., using a vector store)
- Giving Agustrama a more dynamic personality
