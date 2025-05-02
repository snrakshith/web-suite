const { NodeTracerProvider } = require('@opentelemetry/node');
const { SimpleSpanProcessor } = require('@opentelemetry/tracing');
const { FluentdExporter } = require('@opentelemetry/exporter-fluentd');


const tracerProvider = new NodeTracerProvider();

// Configure and add the Fluentd exporter
const exporter = new FluentdExporter({
    serviceName: 'your-service-name',
    // Additional Fluentd exporter configuration options if needed
});

// Add the exporter to the tracer provider
tracerProvider.addSpanProcessor(new SimpleSpanProcessor(exporter));

// Register the tracer provider globally
tracerProvider.register();



const { trace } = require('@opentelemetry/api');

// Create a tracer
const tracer = trace.getTracer('your-instrumentation-name');

// Instrument your code with spans
const span = tracer.startSpan('your-operation-name');
// Add attributes or events to the span if needed
// span.addEvent('your-event-name');

// Perform your app logic here...

// End the span when the operation is complete
span.end();
