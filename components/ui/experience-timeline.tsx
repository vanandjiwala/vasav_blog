"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

type ExperienceEntry = {
  date: string;
  title: string;
  role: string;
  location: string;
  content: string;
  companyUrl?: string;
};

const experienceData: ExperienceEntry[] = [
  {
    date: "Jun 2020 - Present",
    title: "Rightsense INC",
    role: "Senior Data Engineer",
    location: "Bengaluru, India",
    companyUrl: "https://agents.rightsense.ai/",
    content:
      "Leading data engineering initiatives for a Bay Area startup specializing in analytics and AI solutions for retail. Designed and implemented data models, ETL pipelines, and data lakehouses using Apache Spark, Databricks, and AWS. Achieved 30% cost optimization and led GenAI POC development.",
  },
  {
    date: "Aug 2025 - Present",
    title: "Codebasics (1M+ Subscribers)",
    role: "Freelance Data Engineering Mentor",
    location: "Remote",
    companyUrl: "https://codebasics.io/",
    content:
      "Creating educational content and mentoring aspiring data engineers through a popular YouTube channel with over 1 million subscribers. Developing comprehensive tutorials, courses, and practical guidance on data engineering concepts, tools, and best practices.",
  },
  {
    date: "Dec 2018 - May 2020",
    title: "Awaaz de Infosystems Pvt. Ltd.",
    role: "QA Engineer II",
    location: "Ahmedabad, India",
    companyUrl: "https://awaaz.de/",
    content:
      "Established automation frameworks and performance testing protocols for a SaaS platform serving banking and microfinance sectors. Developed Python-based automation testing frameworks and conducted system performance testing to ensure quality solutions.",
  },
  {
    date: "Apr 2015 - Nov 2018",
    title: "Ascendum Solutions LLC",
    role: "System Analyst",
    location: "Cincinnati, OH, USA",
    companyUrl: "https://www.ascendum.com/",
    content:
      "Collaborated with clients across various industries to establish automation strategies and implement testing frameworks. Integrated automation with CI/CD pipelines and conducted platform certification and ETL testing for various databases.",
  },
  {
    date: "Jun 2014 - Aug 2014",
    title: "Ascendum Solutions LLC",
    role: "Associate Business Analyst (Intern)",
    location: "Cincinnati, OH, USA",
    companyUrl: "https://www.ascendum.com/",
    content:
      "Optimized internal company processes, achieving a 25% increase in overall efficiency. Engineered automated systems synchronizing sales and accounting operations using BPM tools, API clients, and Microsoft Excel.",
  },
  {
    date: "Jun 2011 - Aug 2012",
    title: "Manek Real Property Developers Pvt. Ltd.",
    role: "Associate Web Development Engineer",
    location: "Ahmedabad, India",
    content:
      "Collaborated with the development team to facilitate front-end development tasks. Transformed mockup designs into scalable, responsive front-end code and supported QA testing activities.",
  },
];

export default function ExperienceTimeline() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-3xl font-semibold mb-12 text-center">
          Professional Experience
        </h2>

        <div className="relative mx-auto max-w-4xl">
          {/* Vertical line */}
          <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-muted" />

          {experienceData.map((entry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative mb-10 pl-12"
            >
              {/* Timeline dot */}
              <div className="absolute left-0 top-2 h-5 w-5 rounded-full bg-primary ring-4 ring-background" />

              {/* Content */}
              <div className="mb-2">
                {entry.companyUrl ? (
                  <a
                    href={entry.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl font-semibold text-foreground hover:text-primary transition-colors inline-block"
                  >
                    {entry.title}
                  </a>
                ) : (
                  <h3 className="text-xl font-semibold text-foreground">
                    {entry.title}
                  </h3>
                )}
                <p className="text-base text-primary font-medium">{entry.role}</p>
                <div className="flex flex-wrap gap-2 mt-1 text-sm text-muted-foreground">
                  <span>{entry.date}</span>
                  <span>•</span>
                  <span>{entry.location}</span>
                </div>
              </div>
              <Card className="border bg-card shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="px-5 py-4">
                  <p className="leading-relaxed text-muted-foreground">
                    {entry.content}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
