rails db:migrate
# For configuring network in docker containers
# We have to explicit bind to 0.0.0.0
rails server -b 0.0.0.0