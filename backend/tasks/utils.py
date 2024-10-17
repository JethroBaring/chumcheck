from readinesslevel import models as readinesslevel_models
from startups import utils as startups_utils
from tasks import models as tasks_models


def create_base_prompt(startup):
    capsule_proposal_info = (
        startup.capsule_proposal_info
        if hasattr(startup, "capsule_proposal_info")
        else None
    )

    if not capsule_proposal_info:
        return None

    trl, irl, mrl, rrl, arl, orl = startups_utils.get_first_readiness_levels(startup.id)

    prompt = f"""
    Given these data:
    Acceleration Proposal Title: {capsule_proposal_info.title}
    Duration: 3 months
    I. About the startup
    A. Startup Description
    {capsule_proposal_info.startup_description}
    B. Problem Statement
    {capsule_proposal_info.problem_statement}
    C. Target Market
    {capsule_proposal_info.target_market}
    D. Solution Description
    {capsule_proposal_info.solution_description}
    II. About the Proposed Acceleration
    A. Objectives
    {capsule_proposal_info.objectives}
    B. Scope of The Proposal
    {capsule_proposal_info.scope}
    C. Methodology and Expected Outputs
    {capsule_proposal_info.methodology}
    Initial Readiness Level:
    TRL {trl.level}
    IRL {irl.level}
    MRL {mrl.level}
    RRL {rrl.level}
    ARL {arl.level}
    ORL {orl.level}
    """

    return prompt


def create_task_prompt(task):
    prompt = f"""
    priority_number: {task.priority_number}
    readiness_type: {readinesslevel_models.ReadinessType.RLType(task.readiness_type.rl_type).label}
    target_level: {task.target_level}
    description: {task.description}
    task_type: {tasks_models.Task.TaskType(task.task_type).label}
    """

    return prompt


def create_initiative_prompt(initiative):
    prompt = f"""
    initiative_number: {initiative.initiative_number}
    description: {initiative.description}
    measures: {initiative.measures}
    targets: {initiative.targets}
    remarks: {initiative.remarks}
    """

    return prompt
