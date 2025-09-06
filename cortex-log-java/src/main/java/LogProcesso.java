import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class LogProcesso {
private LocalDateTime timestamp;
private String processo;
private Integer pid;
private Double cpu;
private Double ram;

    public LogProcesso(String timestamp, String processo, Integer pid, Double cpu, Double ram) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yy-MM-dd HH:mm:ss");
        LocalDateTime dataTime = LocalDateTime.parse(timestamp, formatter);
        this.timestamp = dataTime;
        this.processo = processo;
        this.pid = pid;
        this.cpu = cpu;
        this.ram = ram;
    }

    @Override
    public String toString() {
        return "LogProcesso{" +
                ", pid=" + pid + "\n";
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public String getProcesso() {
        return processo;
    }

    public void setProcesso(String processo) {
        this.processo = processo;
    }

    public Integer getPid() {
        return pid;
    }

    public void setPid(Integer pid) {
        this.pid = pid;
    }

    public Double getCpu() {
        return cpu;
    }

    public void setCpu(Double cpu) {
        this.cpu = cpu;
    }

    public Double getRam() {
        return ram;
    }

    public void setRam(Double ram) {
        this.ram = ram;
    }


}



















