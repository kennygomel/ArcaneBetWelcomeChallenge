FROM ruby:2.5.1-alpine

# set up timezone
RUN apk add --update tzdata && \
    cp /usr/share/zoneinfo/Europe/Minsk /etc/localtime && \
    echo "Europe/Minsk" > /etc/timezone

# install application runtime-dependencies
RUN apk add --update --virtual runtime-deps postgresql-client libffi-dev readline sqlite

# collect all in temp folder
WORKDIR /tmp
ADD Gemfile* ./

RUN apk add --virtual build-deps build-base postgresql-dev libc-dev linux-headers libxml2-dev libxslt-dev readline-dev && \
    bundle install --jobs=2 && \
    apk del build-deps

# copy code to the container
ENV APP_HOME /app
COPY . $APP_HOME
WORKDIR $APP_HOME

# port forwarding
EXPOSE 3000

# server run
CMD ["bundle", "exec", "puma", "-C", "config/puma.rb"]
