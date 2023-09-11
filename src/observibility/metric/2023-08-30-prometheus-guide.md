---
lang: zh-CN
title: Prometheus概述
description: Prometheus简介
---



## 什么是Prometheus

Prometheus受启发于Google的Brogmon监控系统（类似于Kubernetes是从Google的Brog系统演变而来），从2012年开始由前Google工程师以开源软件的形式进行研发，并且于2015年对外发布早期版本。2016年5月继Kubernetes之后成为第二个正式加入CNCF(云原生计算基金会)的项目，同年6月正式发布1.0版本。2017年底发布了基于全新存储层的2.0版本，能更好地与容器平台、云平台配合。

![image-20230909095443791](https://static.javajike.com/img/2023/9/9/image-20230909095443791.png)

Prometheus作为新一代的云原生监控系统，目前已经有超过755+位贡献者参与到Prometheus的研发工作上，并且超过120+项的第三方集成。



##  Prometheus提供的特性

作为新一代的监控系统，Prometheus和传统的监控系统相比，有着非常大的创新。Prometheus让监控从传统的黑盒子监控提升到了白盒监控；不仅可以监控系统的一些状态，也可以深入到进程内部关键点的监控（白盒监控）。



Prometheus提供一些关键的特性：

- 多维的数据结构，这个数据结构包括一个指标名和一系列的键值对。
- 提供了数据查询的Promql，



### Features

Prometheus's main features are:

- a multi-dimensional [data model](https://prometheus.io/docs/concepts/data_model/) with time series data identified by metric name and key/value pairs
- PromQL, a [flexible query language](https://prometheus.io/docs/prometheus/latest/querying/basics/) to leverage this dimensionality
- no reliance on distributed storage; single server nodes are autonomous
- time series collection happens via a pull model over HTTP
- [pushing time series](https://prometheus.io/docs/instrumenting/pushing/) is supported via an intermediary gateway
- targets are discovered via service discovery or static configuration
- multiple modes of graphing and dashboarding support
