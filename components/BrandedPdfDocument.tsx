// components/BrandedPdfDocument.tsx
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from '@react-pdf/renderer';

// 1. Styles
const styles = StyleSheet.create({
  page: {
    position: 'relative',
    padding: 40,
    fontSize: 12,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  header: {
    fontSize: 18,
    marginBottom: 10,
    color: '#1e40af',
    fontWeight: 'bold',
  },
  field: {
    marginBottom: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1e3a8a',
  },
  value: {
    fontSize: 12,
    color: '#111827',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 10,
    color: '#9ca3af',
  },
  watermark: {
    position: 'absolute',
    top: '40%',
    left: '20%',
    transform: 'rotate(-30deg)',
    fontSize: 40,
    opacity: 0.08,
    color: '#1e40af',
    fontWeight: 'bold',
  },
});

// 2. Component
export default function BrandedPdfDocument({ data }: { data: Record<string, any> }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Watermark */}
        <Text style={styles.watermark}>Formwise-AI</Text>

        {/* Header */}
        <Image src="/formwise-logo.png" style={styles.logo} />
        <Text style={styles.header}>Formwise-AI • PDF Extracted Data</Text>

        {/* Dynamic Fields */}
        {Object.entries(data).map(([key, value]) => (
          <View style={styles.field} key={key}>
            <Text style={styles.label}>{key}</Text>
            <Text style={styles.value}>{String(value)}</Text>
          </View>
        ))}

        {/* Footer */}
        <Text style={styles.footer}>
          © {new Date().getFullYear()} Formwise-AI · AI-powered form parsing · www.formwise.ai
        </Text>
      </Page>
    </Document>
  );
}
