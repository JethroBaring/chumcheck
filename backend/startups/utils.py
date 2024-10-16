from django.template.loader import render_to_string

from generic import utils as generic_utils
from generic.email import send_email
from readinesslevel import models as readinesslevel_models
from startups import models as startups_models
from users import models as users_models


def send_approval_email(email, startup_name):
    subject = "LaunchLab Application Approved – Welcome aboard!"
    html_template = "emailtemplate.html"
    message = render_to_string(html_template, context={"startup_name": startup_name})
    recipient_list = [email]
    send_email(subject, message, recipient_list)


def send_rejection_email(email):
    subject = "LaunchLab Application Status"
    html_template = "rejectemailtemplate.html"
    message = render_to_string(html_template)
    recipient_list = [email]
    send_email(subject, message, recipient_list)


def calculate_levels(startup_id):
    calculator_answers = startups_models.CalculatorQuestionAnswer.objects.filter(
        startup_id=startup_id
    )

    technology_level = 1
    commercialization_level = 1
    technology_score = 0
    product_development = 0
    product_definition = 0
    competitive_landscape = 0
    team = 0
    go_to_market = 0
    supply_chain = 0

    for answer in calculator_answers:
        question = answer.calculator_question
        category = answer.calculator_question.category.category.lower()

        if category == "technology":
            technology_score = question.score
        elif category == "product development":
            product_development = question.score
        elif category == "product definition/design":
            product_definition = question.score
        elif category == "competitive landscape":
            competitive_landscape = question.score
        elif category == "team":
            team = question.score
        elif category == "go-to-market":
            go_to_market = question.score
        elif category == "manufacturing/supply chain":
            supply_chain = question.score

    if technology_score >= 4:
        technology_level = 4
    if technology_score >= 5:
        technology_level = 5
    if product_development >= 2 and product_definition >= 3:
        technology_level = 6
    if product_development >= 3:
        technology_level = 7
    if product_development >= 4:
        technology_level = 8
    if product_development >= 5:
        technology_level = 9

    if competitive_landscape >= 1 and team >= 1:
        commercialization_level = 1
    if competitive_landscape >= 2 and team == 2:
        commercialization_level = 2
    if (
        product_development >= 1
        and product_definition >= 1
        and competitive_landscape >= 3
        and team >= 2
        and go_to_market >= 1
    ):
        commercialization_level = 3
    if (
        product_definition >= 2
        and competitive_landscape >= 4
        and team >= 2
        and go_to_market >= 2
        and supply_chain >= 1
    ):
        commercialization_level = 4
    if (
        product_definition >= 4
        and competitive_landscape >= 5
        and team >= 3
        and go_to_market >= 3
        and supply_chain >= 2
    ):
        commercialization_level = 5
    if product_definition >= 5 and team >= 4 and go_to_market >= 4:
        commercialization_level = 6
    if team >= 4 and supply_chain >= 3:
        commercialization_level = 7
    if team >= 5 and supply_chain >= 4:
        commercialization_level = 8
    if team >= 5 and supply_chain >= 5:
        commercialization_level = 9

    return (
        technology_level,
        commercialization_level,
        technology_score,
        product_development,
        product_definition,
        competitive_landscape,
        team,
        go_to_market,
        supply_chain,
    )


def get_first_readiness_levels(startup_id):
    startup_readiness_levels = readinesslevel_models.ReadinessLevel.objects.filter(
        startups_level__startup_id=startup_id
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
            trl = startup_readiness_level
        elif (
            not irl
            and readiness_type == readinesslevel_models.ReadinessType.RLType.INVESTMENT
        ):
            irl = startup_readiness_level
        elif (
            not mrl
            and readiness_type == readinesslevel_models.ReadinessType.RLType.MARKET
        ):
            mrl = startup_readiness_level
        elif (
            not rrl
            and readiness_type == readinesslevel_models.ReadinessType.RLType.REGULATORY
        ):
            rrl = startup_readiness_level
        elif (
            not arl
            and readiness_type == readinesslevel_models.ReadinessType.RLType.ACCEPTANCE
        ):
            arl = startup_readiness_level
        elif (
            not orl
            and readiness_type
            == readinesslevel_models.ReadinessType.RLType.ORGANIZATIONAL
        ):
            orl = startup_readiness_level

        if all([trl, irl, mrl, rrl, arl, orl]):
            break

    return trl, irl, mrl, rrl, arl, orl
