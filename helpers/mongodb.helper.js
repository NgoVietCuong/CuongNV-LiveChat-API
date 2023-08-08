const Aggregate = {
  sort: (pipelineStage) => ({ $sort: pipelineStage }),
  facet: (pipelineStage) => ({ $facet: pipelineStage }),
  match: (pipelineStage) => ({ $match: pipelineStage }),
  group: (pipelineStage) => ({ $group: pipelineStage }),
  limit: (pipelineStage) => ({ $limit: pipelineStage }),
  unwind: (pipelineStage) => ({ $unwind: pipelineStage }),
  project: (pipelineStage) => ({ $project: pipelineStage }),
  addFields: (pipelineStage) => ({ $addFields: pipelineStage})
}

module.exports = Aggregate;