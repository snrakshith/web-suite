# grafana

- grafana is like a digital dashboard for your data.
- It is an open source visualization and monitoring platform.
- It is used to visualize metrics, logs, and traces from multiple sources.
- Loki is like a cost effective & efficient place for you to store log data.
- Its designed to store large volume of log entries in a budget friendly manner.
- It works closely with promtail to organize log data.
- pormtail
  - is like a bridge b/w the loki & data sources.
  - simplify the process of ingesting logs into loki.

> Data Source -> Promtail -> loki -> Grafana -> User

- It can be used to ingest logs from multiple sources.
- promtail simplify the process of gathering logdata which is essential for log monitoring & troubleshooting.
- Add filebeat to send log data to elasticsearch.

# Prometheus

- Prometheus is a monitoring system/tool for metric collection and time series database.
- Data retention of 15 days.
- Port: 9090
- We can define `scrape` & `target` in the `prometheus-config.yml` file.

# Logs & Log Aggregation

- Logs generally refers to a events that occurs with a system, network or software app.
- Event types:
  - system events
  - network events
  - application events
  - security events
- Log aggregation refers to the process of grouping log entries together based on certain criteria.
- Log aggregation can help to reduce the volume of log data, which can improve performance and efficiency.
- Log aggregation can also help to identify patterns and trends in the log data, which can help to identify potential issues or anomalies.

- log file can be,
  - plain text file
  - binary format
  - structured data formats
    - JSON
    - XML
- They are usually written by a logging framework, such as winston/pino etc, within the application or system.

- general log structure
  - timestamp
  - log level
    - debug
    - info
    - warn
    - error
  - log message describing the event
  - log fields

# Observability

- Observability refers to the ability to monitor and understand the behavior of a system, network or software app.
- Observability can help to identify potential issues or anomalies in the system, network or software app.
