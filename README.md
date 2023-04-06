# microfrontend_web

This repo is a experimental playground testing different frontend/backend technologies.

Currently planned additions:
- [ ] Server side rendering (SSR) app using NextJs
- [ ] Microfrontend architecture using Qiankun, using Craco for configuration overriding
- [ ] Microfrontend architecture using webpack 5 module federation

## Notes
### Create React App (CRA)
CRA is a framework for developing client side rendered (CSR) react apps. CRA 2.0 supports
a lot of sensible defaults, such as SASS and SASS modules out of the box, making manual
configuration and configuration file(s) maintenance unnecessary. 

## GraphQL vs. REST API
GraphQL solves many problems that would be difficult to solve with REST API. For example,
the underfetching and overfetching problem or endpoint subscriptions. Furthermore, Apollo's
GraphQL libraries suppport powerful features (see sections below).

### Apollo GraphQL client
Apollo's GraphQL client is powerful by supports client-side caching operations by default,
and supports caching configurations. While this is a powerful, performant feature that can
save calls to GraphQL endpoints, it is a double-edged sword, potentially causing bugs related
to stale cache entries.

### Apollo GraphQL server federation
Apollo's GraphQL federation involves a router server that composes the GraphQL schema and
routes GraphQL calls to backend GraphQL servers to support a microservices architecture.
While strictly not necessary for this particular project, it is used here for proof-of-concept.

## NestJs
A popular, opinionated NodeJs framework for developing GraphQL endpoints and also supports
Apollo's GraphQL federation.

## Codegen
Codegen is a powerful developer tool that autogenerates types based on GraphQL schemas and
.graphql files, so TypeScript static analysis can work with returned data, i.e. no any typing.

## Setup and run
1. **cd nestjs-federation/subgraphs/wallet** and **npm run start** (starts exchange subgraph server on port 3002).
2. **cd nestjs-federation/subgraphs/exchange** and **npm run start** (starts wallet subgraph server on port 3003).
3. **cd federation-router** and **npm run start** (starts router server on port 3001 and connects to subgraph servers).
4. **cd csr-apps/cra** and **npm run start** (starts React developer server on port 3000).
