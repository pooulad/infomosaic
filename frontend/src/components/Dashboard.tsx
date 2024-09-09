import { Alert, Box, useTheme } from "@mui/material";
import { DiskIcon, MonitorIcon, CpuIcon } from "../assets/icons";
import { useAppSelector } from "../app/hooks";
import { main } from "./mainSlice";
import { PieChart } from "@mui/x-charts/PieChart";
import {
  FormatSizeByBytes,
  UptimeCalculatorBySeconds,
} from "../utils/CommonFunctions";
import { Gauge, gaugeClasses } from "@mui/x-charts";

const pieParams = {
  height: 200,
  margin: { right: 5 },
  slotProps: { legend: { hidden: true } },
};

function Dashboard() {
  const theme = useTheme();

  const { appData } = useAppSelector(main);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: "10px",
        gap: "10px",
        margin: "10px auto 50px",
        minHeight: "80vh",
        [theme.breakpoints.down("md")]: {
          padding: "30px",
        },
      }}
    >
      {!appData && (
        <Box>
          <Alert severity="info">Trying to get websocket info...</Alert>
        </Box>
      )}
      <Box
        sx={{
          width: "95%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          padding: "10px",
          gap: "10px",
          [theme.breakpoints.down("md")]: {
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px",
            gap: "10px",
          },
        }}
      >
        <Box sx={{ width: "100%", flex: 1, padding: "10px", gap: "10px" }}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "3px",
              fontSize: "25px",
            }}
          >
            <Box>System</Box>
            <MonitorIcon
              style={{ height: "30px" }}
              stroke={theme.palette.secondary.main}
            />
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: `1px solid ${theme.palette.text.primary}`,
              }}
            >
              <Box>OS:</Box>
              <Box>{appData?.system?.operating_system}</Box>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: `1px solid ${theme.palette.text.primary}`,
              }}
            >
              <Box>Platform:</Box>
              <Box>{appData?.system?.host_info?.platform}</Box>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: `1px solid ${theme.palette.text.primary}`,
              }}
            >
              <Box>Platform Family:</Box>
              <Box>{appData?.system?.host_info?.platformFamily}</Box>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: `1px solid ${theme.palette.text.primary}`,
              }}
            >
              <Box>Platform Version:</Box>
              <Box>{appData?.system?.host_info?.platformVersion}</Box>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: `1px solid ${theme.palette.text.primary}`,
              }}
            >
              <Box>Kernel version:</Box>
              <Box>{appData?.system?.host_info?.kernelVersion}</Box>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: `1px solid ${theme.palette.text.primary}`,
              }}
            >
              <Box>Hostname:</Box>
              <Box>{appData?.system?.host_info?.hostname}</Box>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: `1px solid ${theme.palette.text.primary}`,
              }}
            >
              <Box>Number of processes running:</Box>
              <Box>{appData?.system?.host_info?.procs}</Box>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: `1px solid ${theme.palette.text.primary}`,
              }}
            >
              <Box>Total memory:</Box>
              <Box>{FormatSizeByBytes(appData?.system?.memory?.total)}</Box>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: `1px solid ${theme.palette.text.primary}`,
              }}
            >
              <Box>Free memory:</Box>
              <Box>{FormatSizeByBytes(appData?.system?.memory?.free)}</Box>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: `1px solid ${theme.palette.text.primary}`,
              }}
            >
              <Box>Used memory by %:</Box>
              <Box>
                {`${(
                  (appData?.system?.memory?.used /
                    appData?.system?.memory?.total) *
                  100
                ).toFixed(2)}%`}
              </Box>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: `1px solid ${theme.palette.text.primary}`,
              }}
            >
              <Box>Uptime:</Box>
              <Box>
                {UptimeCalculatorBySeconds(appData?.system?.host_info?.uptime)}
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "3px",
              fontSize: "25px",
              marginTop: "25px",
            }}
          >
            <Box>Disk</Box>
            <DiskIcon
              style={{
                fill: theme.palette.secondary.main,
                height: "30px",
              }}
            />
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: `1px solid ${theme.palette.text.primary}`,
              }}
            >
              <Box>Total disk space:</Box>
              <Box>{FormatSizeByBytes(appData?.disk?.disk_info?.total)}</Box>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: `1px solid ${theme.palette.text.primary}`,
              }}
            >
              <Box>Used disk space:</Box>
              <Box>{FormatSizeByBytes(appData?.disk?.disk_info?.used)}</Box>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: `1px solid ${theme.palette.text.primary}`,
              }}
            >
              <Box>Free disk space:</Box>
              <Box>{FormatSizeByBytes(appData?.disk?.disk_info?.free)}</Box>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: `1px solid ${theme.palette.text.primary}`,
              }}
            >
              <Box>Percentage disk space usage:</Box>
              <Box>
                {`${(
                  (appData?.disk?.disk_info?.used /
                    appData?.disk?.disk_info?.total) *
                  100
                ).toFixed(2)}%`}
              </Box>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                borderBottom: `1px solid ${theme.palette.text.primary}`,
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
                {appData?.disk?.disk_info && (
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "10px",
                    }}
                  >
                    <Gauge
                      sx={(theme) => ({
                        [`& .${gaugeClasses.valueText}`]: {
                          fontSize: 40,
                        },
                        [`& .${gaugeClasses.valueArc}`]: {
                          fill: theme.palette.secondary.main,
                        },
                        [`& .${gaugeClasses.referenceArc}`]: {
                          fill: theme.palette.text.disabled,
                        },
                      })}
                      height={200}
                      value={appData?.disk?.disk_info?.usedPercent.toFixed()}
                    />
                    <Box>Disk</Box>
                  </Box>
                )}
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
                {appData?.system?.memory && (
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "10px",
                    }}
                  >
                    <Gauge
                      sx={(theme) => ({
                        [`& .${gaugeClasses.valueText}`]: {
                          fontSize: 40,
                        },
                        [`& .${gaugeClasses.valueArc}`]: {
                          fill: theme.palette.secondary.main,
                        },
                        [`& .${gaugeClasses.referenceArc}`]: {
                          fill: theme.palette.text.disabled,
                        },
                      })}
                      height={200}
                      value={appData?.system?.memory?.usedPercent.toFixed()}
                    />
                    <Box>Memory</Box>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={{ width: "100%", flex: 1, padding: "10px", gap: "10px" }}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "3px",
              fontSize: "25px",
            }}
          >
            <Box>CPU</Box>
            <CpuIcon
              style={{ height: "30px" }}
              stroke={theme.palette.secondary.main}
            />
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: `1px solid ${theme.palette.text.primary}`,
              }}
            >
              <Box>Model name:</Box>
              <Box>{appData?.cpu?.cpu_info[0]?.modelName}</Box>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: `1px solid ${theme.palette.text.primary}`,
              }}
            >
              <Box>Family:</Box>
              <Box>{appData?.cpu?.cpu_info[0]?.family}</Box>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: `1px solid ${theme.palette.text.primary}`,
              }}
            >
              <Box>Megahertz:</Box>
              <Box>{appData?.cpu?.cpu_info[0]?.mhz / 1000}</Box>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: `1px solid ${theme.palette.text.primary}`,
              }}
            >
              <Box>Physical ID:</Box>
              <Box>{appData?.cpu?.cpu_info[0]?.physicalId}</Box>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: `1px solid ${theme.palette.text.primary}`,
              }}
            >
              <Box>Vendor ID:</Box>
              <Box>{appData?.cpu?.cpu_info[0]?.vendorId}</Box>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: `1px solid ${theme.palette.text.primary}`,
              }}
            >
              <Box>Number of cores:</Box>
              <Box>{appData?.cpu?.cpu_info[0]?.cores}</Box>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                borderBottom: `1px solid ${theme.palette.text.primary}`,
              }}
            >
              <Box>Cores:</Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "10px",
                  }}
                >
                  {appData?.cpu?.percentage?.map(
                    (core: number, index: number) => {
                      return (
                        <Box
                          sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            gap: "10px",
                          }}
                          key={index}
                        >
                          <Box>CPU{`[${index}]:`}</Box>
                          <Box>{core.toFixed(2)}</Box>
                        </Box>
                      );
                    }
                  )}
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                borderBottom: `1px solid ${theme.palette.text.primary}`,
              }}
            >
              <Box>Cores info chart:</Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                {appData?.cpu?.percentage?.length && (
                  <PieChart
                    series={[
                      {
                        data: appData?.cpu?.percentage?.map(
                          (core: number, index: number) => {
                            return {
                              id: index,
                              value: core,
                              label: `Core[${index}]`,
                            };
                          }
                        ),
                      },
                    ]}
                    {...pieParams}
                    height={250}
                  />
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
