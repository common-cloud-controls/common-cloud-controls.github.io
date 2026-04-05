---
title: CCC Catalogs
description: Standardized capabilities, threats, and controls for common cloud services across all major cloud providers.
---

The CCC catalog system provides a structured, vendor-neutral framework for understanding and securing cloud services. Each cloud service category — such as object storage, key management, or container orchestration — has a dedicated catalog that captures what the service does, what can go wrong, and what controls should be in place.

Catalogs are produced collaboratively by financial services firms, cloud providers, and the broader open source community. They are released as versioned artifacts and are designed to be consumed directly by compliance teams, security engineers, and automated tooling alike.

The three catalog types work together: capabilities define the scope of a service, threats identify the risks within that scope, and controls specify the mitigations. Browse each type below to learn more.

Underpinning all of them is the **core catalog** — a set of cross-cutting capabilities, threats, and controls that apply universally across cloud services. Every CCC service catalog is built on top of it, inheriting the foundation so authors can focus on what is specific to their service rather than re-deriving the fundamentals. The core catalog is also available to any team building their own catalogs: if you are developing requirements for an internal or proprietary cloud service, importing the core catalog gives you a battle-tested foundation to extend rather than a blank slate to fill.

## From Documents to Pipelines

Most organizations spend significant time and effort answering the same question: for a given cloud service, what do we need to require, and how do we know it's being met? That question gets answered separately by different teams, at different firms, for the same set of cloud services — producing redundant work, inconsistent outcomes, and policies that are hard to automate.

CCC short-circuits that process. Because each control already captures the objective, the underlying threat, and the criteria for assessment, your teams can skip the derivation work and move directly to implementation. You are not starting from a blank page — you are starting from a community-vetted standard that financial services firms and cloud providers have already agreed on.

This matters most when you are trying to build governance that scales. The [CNCF TAG Security Automated Governance Maturity Model](https://tag-security.cncf.io/community/resources/automated-governance-maturity-model/) and the [Gemara](https://gemara.openssf.org) GRC Engineering Model for Automated Risk Assessment both describe the same progression: organizations that reach higher maturity levels are those whose policies are specific enough to evaluate automatically, enforce continuously, and audit without manual effort. The bottleneck is almost always the quality of the underlying requirements — vague or inconsistent controls cannot be automated reliably.

CCC removes that bottleneck. Well-structured controls, expressed in a machine-readable schema aligned with Gemara, connect directly to evaluation tooling and enforcement pipelines. The community maintains the standard; your team focuses on operating against it.
