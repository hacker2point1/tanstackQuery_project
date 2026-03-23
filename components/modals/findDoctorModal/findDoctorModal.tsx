"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  TextField,
} from "@mui/material";
import { useDoctorListMutation } from "@/customHooks/query/doctor.query.hooks";

interface Props {
  open: boolean;
  onClose: () => void;
}

const FindDoctorModal: React.FC<Props> = ({ open, onClose }) => {
  const [query, setQuery] = useState("");
  const mutation = useDoctorListMutation();

  const handleSearch = () => {
    mutation.mutate({ search: query });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Find Doctor</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <TextField
            fullWidth
            placeholder="Search by name, specialty or location"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />
          <Button variant="contained" onClick={handleSearch} disabled={mutation.isLoading}>
            {mutation.isLoading ? <CircularProgress size={20} /> : "Search"}
          </Button>
        </Box>

        {/* Results */}
        <Box>
          {mutation.isLoading && (
            <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
              <CircularProgress />
            </Box>
          )}

            {mutation.isSuccess && (
              (() => {
                const raw = mutation.data;
                const doctors = Array.isArray(raw)
                  ? raw
                  : raw?.doctors || raw?.data?.doctors || raw?.data || [];

                return (
                  <List>
                    {doctors.map((doc: any, i: number) => (
                      <ListItem key={doc.id || i} divider>
                        <ListItemText
                          primary={doc.name}
                          secondary={doc.specialty || doc.role || "Doctor"}
                        />
                      </ListItem>
                    ))}
                  </List>
                );
              })()
            )}

          {mutation.isError && (
            <Typography color="error">Failed to load doctors</Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FindDoctorModal;
