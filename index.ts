import * as pulumi from "@pulumi/pulumi";
import * as awsinfra from "@pulumi/aws-infra";
import * as eks from "@pulumi/eks";
import * as k8s from "@pulumi/kubernetes";

const name = "pulumi_eks";

const vpc = new awsinfra.Network("vpc", { usePrivateSubnets: false });
const cluster = new eks.Cluster(name, {
    vpcId: vpc.vpcId,
    subnetIds: vpc.subnetIds,
    desiredCapacity: 2,
    minSize: 1,
    maxSize: 2,
    storageClasses: "gp2",
    deployDashboard: false,
});

export const kubeconfig = cluster.kubeconfig
