rm(processos$X)

processos$X <- NULL

data$X <- NULL

head(data)

head(processos)

str(data)

str(processos)

dim(data)

dim(processos)

summary(data)

summary(processos)

max(data$cpu)

max(processos$ram)




data[,c("ram","cpu")]



barplot(height = data$cpu,
        name.arg = data$timestamp,
        main = "Uso maximo da CPU",
        xlab = "tempo",
        Ylab = "uso %",
        col = "Red"
        )

barplot(height = data$ram,
        name.arg = data$timestamp,
        main = "Uso maximo da RAM",
        xlab = "tempo",
        Ylab = "uso %",
        col = "purple"
)

barplot(height = data$swap,
        name.arg = data$timestamp,
        main = "Uso maximo da SWAP",
        xlab = "tempo",
        Ylab = "uso %",
        col = "green"
)



