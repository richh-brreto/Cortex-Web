
import java.util.ArrayList;
import java.util.Scanner;

public class processos {

    public static void adiconarLog(ArrayList<LogProcesso> lista, LogProcesso log){
        lista.add(log);
    }

    public static void ordenarLog(ArrayList<LogProcesso> logProcessoss) {
        for (int i = 0; i < logProcessoss.size() - 1; i++) {
            int iMenor = i;
            for (int j = i + 1; j < logProcessoss.size(); j++) {

                if (logProcessoss.get(j).getPid() < logProcessoss.get(iMenor).getPid()) {
                    iMenor = j;
                }
            }
            LogProcesso aux = logProcessoss.get(i);
            logProcessoss.set(i, logProcessoss.get(iMenor));
            logProcessoss.set(iMenor, aux);
        }
    }

    public static void main(String[] args) {
        Scanner leitor = new Scanner(System.in);
        ArrayList<LogProcesso> lista= new ArrayList<>();
        LogProcesso log1 = new LogProcesso("05-09-25 14:21:51","svchost.exe",1068,0.0,0.02345);
        LogProcesso log2 = new LogProcesso("05-09-25 14:21:51","WUDFHost.exe",1069,0.0,0.02345);
        LogProcesso log5 = new LogProcesso("05-09-25 14:25:10", "chrome.exe", 1065, 0.2, 0.03456);
        LogProcesso log8 = new LogProcesso("05-09-25 14:28:40", "discord.exe", 1068, 1.5, 0.05612);
        LogProcesso log3 = new LogProcesso("05-09-25 14:23:00", "explorer.exe", 1063, 0.1, 0.03012);
        LogProcesso log10 = new LogProcesso("05-09-25 14:30:15", "idea64.exe", 1070, 3.2, 0.12045);
        LogProcesso log7 = new LogProcesso("05-09-25 14:27:20", "Teams.exe", 1067, 2.1, 0.08934);
        LogProcesso log4 = new LogProcesso("05-09-25 14:24:05", "svchost.exe", 1064, 0.3, 0.02876);
        LogProcesso log6 = new LogProcesso("05-09-25 14:26:00", "spotify.exe", 1066, 0.8, 0.06789);
        LogProcesso log9 = new LogProcesso("05-09-25 14:29:05", "steam.exe", 1062, 1.9, 0.09876);
        adiconarLog(lista,log4);
        adiconarLog(lista,log5);
        adiconarLog(lista,log6);
        adiconarLog(lista,log7);
        adiconarLog(lista,log2);
        adiconarLog(lista,log3);
        adiconarLog(lista,log1);
        adiconarLog(lista,log4);
        adiconarLog(lista,log5);

        System.out.println("Deseja adicionar um log ? (true / false)");
        Boolean adicionando = leitor.nextBoolean();
        while (adicionando) {
            leitor.nextLine();
            System.out.println("Inserir data");
            String timestampUser = leitor.nextLine();
            System.out.println("Inserir processo");
            String processosUser = leitor.nextLine();
            System.out.println("Inserir pid");
            Integer pidUser = leitor.nextInt();
            System.out.println("Inserir uso da cpu");
            Double cpuUser = leitor.nextDouble();
            System.out.println("Inserir uso da ram");
            Double ramUser = leitor.nextDouble();
            LogProcesso logUser = new LogProcesso(timestampUser,processosUser,pidUser,cpuUser,ramUser);
            adiconarLog(lista,logUser);
            System.out.println("Deseja adicionar mais um log? S/N");
            String resposta = leitor.next();
            leitor.nextLine();
            if (resposta.equalsIgnoreCase("N")) {
                adicionando = false;
                break;
            } else if (resposta.equalsIgnoreCase("S")){
                System.out.print("precione Enter");
            } else {
                break;
            }
        }
        System.out.println(lista);

        System.out.println(" deseja ordenar os logs ?  (true / false)");
        Boolean ordenar = leitor.nextBoolean();
        if(ordenar){
            ordenarLog(lista);
            System.out.println(lista);
        } else{
            System.out.println(lista);
        }











    }
}
