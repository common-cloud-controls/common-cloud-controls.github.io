---
title: Control Catalogs
description: Control catalogs specify the concrete security measures that mitigate identified threats for each cloud service.
---

A control catalog defines what must be done to secure a cloud service. Each control entry specifies a concrete, testable requirement that directly addresses one or more threats identified in the corresponding threat catalog.

Controls are written to be implementable and auditable. They are expressed in a cloud-agnostic way so that financial services firms can reference a single standard regardless of which cloud provider they use, and so that cloud providers have a single, authoritative target to conform to.

Each control includes:

- A clear statement of the requirement
- The threat or threats it mitigates
- The capability it applies to
- Mappings to common compliance frameworks where applicable

Control catalogs are the primary artifact consumed by compliance teams and by downstream implementation projects such as [Compliant Financial Infrastructure (CFI)](https://github.com/finos/compliant-financial-infrastructure).

## Where to find them

Control catalogs are maintained in the [control-catalogs](https://github.com/common-cloud-controls/control-catalogs) repository as versioned YAML files. Generated artifacts are published here as each release is cut.
