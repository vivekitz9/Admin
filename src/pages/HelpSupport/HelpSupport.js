// import * as React from "react";
// import { Tabs, Tab, Box, Divider } from "@mui/material";
// import ContactUs from "../../components/helpsupport/ContactUs";
// import FAQ from "../../components/helpsupport/FAQ";

// export default function HelpSupport() {
//   const [value, setValue] = React.useState("contact");

//   const handleChange = React.useCallback((event, newValue) => {
//     setValue(newValue);
//   }, []);

//   return (
//     <Box sx={{ width: "100%", mt: 2 }}>
//       <Tabs
//         value={value}
//         onChange={handleChange}
//         textColor="primary"
//         indicatorColor="primary"
//         aria-label="Help & Support Tabs"
//         variant="fullWidth"
//       >
//         <Tab
//           value="contact"
//           label="Contact Us"
//           id="tab-contact"
//           aria-controls="tabpanel-contact"
//         />
//         <Tab
//           value="faq"
//           label="FAQ"
//           id="tab-faq"
//           aria-controls="tabpanel-faq"
//         />
//       </Tabs>

//       <Divider sx={{ bgcolor: "#84764F" }} />

//       <Box sx={{ p: 2 }}>
//         {value === "contact" && (
//           <Box id="tabpanel-contact" role="tabpanel">
//             <ContactUs />
//           </Box>
//         )}
//         {value === "faq" && (
//           <Box id="tabpanel-faq" role="tabpanel">
//             <FAQ />
//           </Box>
//         )}
//       </Box>
//     </Box>
//   );
// }

import * as React from "react";
import { Tabs, Tab, Box, Divider } from "@mui/material";
import ContactUs from "../../components/helpsupport/ContactUs";
import FAQ from "../../components/helpsupport/FAQ";

export default function HelpSupport() {
  const [value, setValue] = React.useState("contact");

  const handleChange = React.useCallback((event, newValue) => {
    setValue(newValue);
  }, []);

  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
        aria-label="Help & Support Tabs"
        variant="fullWidth"
      >
        <Tab
          value="contact"
          label="Contact Us"
          id="tab-contact"
          aria-controls="tabpanel-contact"
          sx={{ fontSize: "1.2rem", fontWeight: "bold", py: 2, minHeight: 60 }}
        />
        <Tab
          value="faq"
          label="FAQ"
          id="tab-faq"
          aria-controls="tabpanel-faq"
          sx={{ fontSize: "1.2rem", fontWeight: "bold", py: 2, minHeight: 60 }}
        />
      </Tabs>

      <Divider sx={{ bgcolor: "#84764F" }} />

      <Box sx={{ p: 2 }}>
        {value === "contact" && (
          <Box id="tabpanel-contact" role="tabpanel">
            <ContactUs />
          </Box>
        )}
        {value === "faq" && (
          <Box id="tabpanel-faq" role="tabpanel">
            <FAQ />
          </Box>
        )}
      </Box>
    </Box>
  );
}
