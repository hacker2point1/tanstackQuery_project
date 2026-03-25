"use client";

import { useState, useEffect } from "react";
import {
  Autocomplete,
  TextField,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDoctorList } from "@/customHooks/query/doctor.query.hooks";
import AppointmentModal from "@/components/modals/appointmentModal/appointmentModal";
import { useDoctorAppoinment } from "@/customHooks/query/doctor.query.hooks";

interface DoctorOption {
  _id: string;
  name: string;
  department?: any;
  label: string;
}

export const BannerSearch = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [options, setOptions] = useState<DoctorOption[]>([]);
  const [openAppointmentModal, setOpenAppointmentModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);

  // Fetch doctors based on search query
  const { data, isLoading } = useDoctorList({
    search: debouncedSearch,
    limit: 10,
  });

  // Appointment mutation hook
  const { mutate: bookAppointment } = useDoctorAppoinment();

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);

  // Transform API response to autocomplete options
  useEffect(() => {
    if (data && Array.isArray(data?.data)) {
      const doctorOptions: DoctorOption[] = data.data.map((doctor: any) => ({
        _id: doctor._id,
        name: doctor.name,
        department: doctor.department,
        label: `Dr. ${doctor.name} - ${
          typeof doctor.department === "object"
            ? doctor.department?.name || "General"
            : doctor.department || "General"
        }`,
      }));
      setOptions(doctorOptions);
    } else {
      setOptions([]);
    }
  }, [data]);

  const handleOptionSelect = (option: any) => {
    if (option?._id) {
      // Find the full doctor object from the data
      const fullDoctor = data?.data?.find((doc: any) => doc._id === option._id);
      setSelectedDoctor(fullDoctor || option);
      setOpenAppointmentModal(true);
      setSearch(""); // Clear search after selection
    }
  };

  const handleAppointmentSubmit = (payload: {
    date: string;
    time: string;
    name: string;
  }) => {
    if (selectedDoctor?._id) {
      bookAppointment({
        doctorId: selectedDoctor._id,
        date: payload.date,
        slot: payload.time,
        patient: payload.name,
      });
      setOpenAppointmentModal(false);
      setSelectedDoctor(null);
    }
  };

  return (
    <>
      <Autocomplete
        freeSolo
        options={options}
        getOptionLabel={(option) =>
          typeof option === "string" ? option : option.label || ""
        }
        inputValue={search}
        onInputChange={(event, newValue) => setSearch(newValue)}
        onChange={(event, value) => handleOptionSelect(value)}
        loading={isLoading}
        sx={{
          maxWidth: "500px",
          backgroundColor: "#fff",
          borderRadius: "50px",
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search doctors, departments..."
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "50px",
                paddingRight: "10px",
              },
            }}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#d87aa0" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <>
                  {isLoading && <CircularProgress color="inherit" size={20} />}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />

      {/* Appointment Modal */}
      <AppointmentModal
        open={openAppointmentModal}
        onClose={() => {
          setOpenAppointmentModal(false);
          setSelectedDoctor(null);
        }}
        onSubmit={handleAppointmentSubmit}
        doctorId={selectedDoctor?._id}
        doctor={selectedDoctor}
      />
    </>
  );
};
