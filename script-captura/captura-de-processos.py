import psutil
import pandas as pd
import time as tm
import datetime as time

processos = []

horario = time.datetime.now()
qtdCpuLogico = psutil.cpu_count()
usuario = psutil.users()
horarioAjustado = horario.strftime("%d-%m-%y %H:%M:%S")


for proc in psutil.process_iter():
  
 
  dado = {
    'timestamp':horarioAjustado
    ,'processo': proc.name()
    ,'pid': proc.pid
    ,'cpu':proc.cpu_percent()
    ,'ram': round(proc.memory_percent(),4)
 }
  processos.append(dado)
 


cooldown_duracao =   10
tempoDelimitado = int(input("por quantos minutos os dados devem ser capturados \n"))
data = []

for i in range(0,tempoDelimitado * 6):
 cpuCapturada = psutil.cpu_percent(interval=0)
 memoryCapturada =  psutil.virtual_memory()
 diskCapturada = psutil.disk_usage('/')
 horario = time.datetime.now()
 swap = psutil.swap_memory()
 horarioAjustado = horario.strftime("%d-%m-%y %H:%M:%S")
 dado = {
    'user': usuario[0][0]
    ,'timestamp':horarioAjustado
    ,'cpu': cpuCapturada
    ,'ram': memoryCapturada.percent
    ,'disco': diskCapturada.percent
    ,'swap': swap.percent
 }
 
 data.append(dado)

  
 tm.sleep(cooldown_duracao)


df1 = pd.DataFrame(data = data)

df1.to_csv('data.csv',sep=';')

print(df1)

df = pd.DataFrame(data = processos)

df.to_csv('processos.csv',sep=';')

print(df) 