from django.urls import path
from .views import (
    DashboardStatsView,
    FleetOverviewView,
    TripsSummaryView,
    ActivitiesView,
    NotificationsView
)

urlpatterns = [
    path('stats/', DashboardStatsView.as_view(), name='dashboard_stats'),
    path('stats', DashboardStatsView.as_view()),
    path('fleet-overview/', FleetOverviewView.as_view(), name='dashboard_fleet_overview'),
    path('fleet-overview', FleetOverviewView.as_view()),
    path('trips/', TripsSummaryView.as_view(), name='dashboard_trips'),
    path('trips', TripsSummaryView.as_view()),
    path('activities/', ActivitiesView.as_view(), name='dashboard_activities'),
    path('activities', ActivitiesView.as_view()),
    path('notifications/', NotificationsView.as_view(), name='dashboard_notifications'),
    path('notifications', NotificationsView.as_view()),
]
