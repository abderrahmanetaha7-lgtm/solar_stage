import { FormControl, Select, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const handleChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <FormControl size="small">
      <Select
        value={i18n.language}
        onChange={handleChange}
        sx={{ minWidth: 80 }}
      >
        <MenuItem value="fr" sx={{ "&:hover": { color: "primary.main" } }}>
          Français
        </MenuItem>
        <MenuItem value="ar" sx={{ "&:hover": { color: "primary.main" } }}>
          العربية
        </MenuItem>
      </Select>
    </FormControl>
  );
}
