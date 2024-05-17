from readinesslevel import models as readinesslevel_models
from tasks import models as tasks_models


def create_base_prompt(startup):
    capsule_proposal_info = (
        startup.capsule_proposal_info
        if hasattr(startup, "capsule_proposal_info")
        else None
    )

    if not capsule_proposal_info:
        return None

    startup_readiness_levels = readinesslevel_models.ReadinessLevel.objects.filter(
        startups_level__id=startup.id
    )

    trl = None
    irl = None
    mrl = None
    rrl = None
    arl = None
    orl = None

    for startup_readiness_level in startup_readiness_levels:
        readiness_type = startup_readiness_level.readiness_type.rl_type
        if (
            not trl
            and readiness_type == readinesslevel_models.ReadinessType.RLType.TECHNOLOGY
        ):
            trl = startup_readiness_level.level
        elif (
            not irl
            and readiness_type == readinesslevel_models.ReadinessType.RLType.INVESTMENT
        ):
            irl = startup_readiness_level.level
        elif (
            not mrl
            and readiness_type == readinesslevel_models.ReadinessType.RLType.MARKET
        ):
            mrl = startup_readiness_level.level
        elif (
            not rrl
            and readiness_type == readinesslevel_models.ReadinessType.RLType.REGULATORY
        ):
            rrl = startup_readiness_level.level
        elif (
            not arl
            and readiness_type == readinesslevel_models.ReadinessType.RLType.ACCEPTANCE
        ):
            arl = startup_readiness_level.level
        elif (
            not orl
            and readiness_type
            == readinesslevel_models.ReadinessType.RLType.ORGANIZATIONAL
        ):
            orl = startup_readiness_level.level

        if all([trl, irl, mrl, rrl, arl, orl]):
            break

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
    TRL {trl}
    IRL {irl}
    MRL {mrl}
    RRL {rrl}
    ARL {arl}
    ORL {orl}
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
