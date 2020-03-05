FROM ruby:2.6.5-stretch
COPY . /usr/app
WORKDIR /usr/app
# Update bunlder
COPY Gemfile /usr/app/Gemfile
COPY Gemfile.lock /usr/app/Gemfile.lock
RUN gem install bundler && \
    bundle install
EXPOSE 3000
CMD ["sh", "./start_server.sh" ]

