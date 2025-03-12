import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { styles } from "./style";

// Main Resume Component
const ResumePDF = ({ resumeInfo }: { resumeInfo: IResumeInfo | undefined }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Personal Details */}
        <View style={styles.section}>
          <Text style={{ ...styles.header, color: resumeInfo?.themeColor }}>
            {resumeInfo?.firstName} {resumeInfo?.lastName}
          </Text>
          <Text style={styles.subHeader}>{resumeInfo?.jobTitle}</Text>
          <Text
            style={{
              ...styles.text,
              textAlign: "center",
              color: resumeInfo?.themeColor,
            }}
          >
            {resumeInfo?.address}
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ ...styles.text, textAlign: "center" }}>
              {resumeInfo?.phone}
            </Text>
            <Text style={{ ...styles.text, textAlign: "center" }}>
              {resumeInfo?.email}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Summary */}
        <View style={styles.section}>
          {/* <Text style={{ fontWeight: 'bold', fontSize: 12, marginBottom: 5 ,textAlign:'center' }}>Summary</Text> */}
          <Text style={styles.text}>{resumeInfo?.summary}</Text>
        </View>

        {/* Experience */}
        {(resumeInfo?.experiences?.length as number) > 0 && (
          <View style={styles.section}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 12,
                marginBottom: 5,
                textAlign: "center",
              }}
            >
              Professional Experience
            </Text>
            <View style={styles.divider} />

            {resumeInfo?.experiences.map((exp, index) => (
              <View key={index} style={styles.experienceContainer}>
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: "bold",
                    color: resumeInfo?.themeColor,
                  }}
                >
                  {exp.title}
                    </Text>
                    <View style={{width:"100%",flexDirection:'row', justifyContent:'space-between'}}> 
                <Text style={styles.text}>
                  {exp.companyName}, {exp.city}, {exp.state} 
                </Text>
                <Text style={styles.text}>
                  {exp.startDate} -{" "}
                  {exp.endDate}
                </Text>
                    </View>
                <Text style={styles.text}>{exp.workSummery}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {(resumeInfo?.education?.length as number) > 0 && (
          <View style={styles.section}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 12,
                marginBottom: 5,
                textAlign: "center",
              }}
            >
              Education
            </Text>
            <View style={styles.divider} />

            {resumeInfo?.education.map((edu, index) => (
              <View key={index}>
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: "bold",
                    color: resumeInfo?.themeColor,
                  }}
                >
                  {edu.universityName}
                    </Text>
                    <View style={{width:"100%",flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={styles.text}>
                  {edu.degree} in {edu.major} 
                        </Text>
                <Text style={styles.text}>
                 {edu.startDate} - {edu.endDate}
                        </Text>
                        </View>
                <Text style={styles.text}>{edu.description}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {(resumeInfo?.skills?.length as number) > 0 && (
          <View style={styles.section}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 12,
                marginBottom: 5,
                textAlign: "center",
              }}
            >
              Skills
            </Text>
            <View style={styles.divider} />

            <View style={styles.skillList}>
              {resumeInfo?.skills.map((skill, index) => (
                <View key={index} style={{ width:'50%',marginBottom: 20 ,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                      <Text style={{ ...styles.text,marginLeft:10 }}>{skill.name}</Text>
                  <View style={styles.skillBar}>
                    <View
                      style={{
                        ...styles.skillFill,
                        backgroundColor: "black",
                        width: `${skill.rating}%`,
                      }}
                    />
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
};

export default ResumePDF;
