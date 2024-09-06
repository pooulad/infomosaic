package systeminfo

import (
	"fmt"
	"runtime"

	"github.com/shirou/gopsutil/v4/cpu"
	"github.com/shirou/gopsutil/v4/disk"
	"github.com/shirou/gopsutil/v4/host"
	"github.com/shirou/gopsutil/v4/mem"
)

type SystemSection struct {
	OperatingSystem string                 `json:"operating_system"`
	Memory          *mem.VirtualMemoryStat `json:"memory"`
	HostInfo        *host.InfoStat         `json:"host_info"`
}

type DiskSection struct {
	DiskStat *disk.UsageStat `json:"disk_info"`
}

type CpuSection struct {
	CPU        []cpu.InfoStat `json:"cpu_info"`
	Percentage []float64      `json:"percentage"`
}

func GetSystemSection() (interface{}, error) {
	runTimeOS := runtime.GOOS

	vmStat, err := mem.VirtualMemory()
	if err != nil {
		return nil, err
	}

	hostStat, err := host.Info()
	if err != nil {
		return nil, err
	}

	data := SystemSection{
		OperatingSystem: runTimeOS,
		Memory:          vmStat,
		HostInfo:        hostStat,
	}

	return data, nil
}

func GetDiskSection() (interface{}, error) {
	diskStat, err := disk.Usage("/")
	if err != nil {
		return nil, err
	}

	data := DiskSection{
		DiskStat: diskStat,
	}

	return data, nil
}

func GetCpuSection() (interface{}, error) {
	cpuStat, err := cpu.Info()
	if err != nil {
		fmt.Println("Error getting CPU info", err)

	}
	percentage, err := cpu.Percent(0, true)
	if err != nil {
		return nil, err
	}

	data := CpuSection{
		CPU:        cpuStat,
		Percentage: percentage,
	}

	return data, nil
}
